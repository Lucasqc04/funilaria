import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface FormData {
  clientName: string;
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  service: string;
  price: number;
  date: string;
  time: string;
  notes: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
}

export const services: Service[] = [
  { id: 'polimento-pequeno', name: 'Polimento de carro pequeno', price: 250 },
  { id: 'polimento-grande', name: 'Polimento de carro grande', price: 350 },
  { id: 'funilaria-completa', name: 'Funilaria completa', price: 1800 },
  { id: 'reparo-amassado', name: 'Reparo de amassado', price: 380 },
  { id: 'pintura-parcial', name: 'Pintura parcial', price: 650 },
  { id: 'pintura-completa', name: 'Pintura completa', price: 2500 }
];

export const useAppointmentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    phone: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    service: services[0].name,
    price: services[0].price,
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  // Atualiza os dados do formulário. Se for "service", atualiza também o preço.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'service') {
      const selectedService = services.find(service => service.name === value);
      if (selectedService) {
        setFormData(prev => ({
          ...prev,
          service: selectedService.name,
          price: selectedService.price
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Ao mudar a data, busca os horários já reservados para essa data
  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (formData.date) {
        try {
          const q = query(
            collection(db, 'Appointments'),
            where('date', '==', formData.date)
          );
          const querySnapshot = await getDocs(q);
          const times = querySnapshot.docs.map(doc => doc.data().time);
          setBookedTimes(times);
        } catch (error) {
          console.error("Erro ao buscar horários reservados:", error);
          setBookedTimes([]);
        }
      } else {
        setBookedTimes([]);
      }
    };
    fetchBookedTimes();
  }, [formData.date]);

  // Envia os dados do formulário para o Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      // Junta os dados do veículo no formato desejado
      const vehicleCombined = `${formData.vehicleBrand}, ${formData.vehicleModel}, ${formData.vehicleYear}, ${formData.vehicleColor}`;
      const appointmentsCollectionRef = collection(db, 'Appointments');
      await addDoc(appointmentsCollectionRef, {
        clientName: formData.clientName,
        phone: formData.phone,
        vehicle: vehicleCombined,
        service: formData.service,
        price: formData.price,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        status: 'Pendente',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error("Erro ao adicionar agendamento:", error);
      setErrorMessage("Erro ao adicionar agendamento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Geração dos horários disponíveis: das 08:00 às 17:00 com intervalos de 30 minutos
  const availableTimes: string[] = [];
  for (let hour = 8; hour <= 17; hour++) {
    for (let minute of ['00', '30']) {
      if (hour === 17 && minute === '30') continue;
      availableTimes.push(`${hour.toString().padStart(2, '0')}:${minute}`);
    }
  }

  // Data mínima para agendamento: amanhã
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    success,
    errorMessage,
    availableTimes,
    minDate,
    services,
    bookedTimes
  };
};
