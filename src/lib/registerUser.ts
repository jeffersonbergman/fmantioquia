import { supabase } from '../lib/supabaseClient';

export const registerUser = async (formData) => {
  try {
    const {
      fullName,
      email,
      phone,
      instrument,
      secondInstrument,
      experience,
      specialRequirements,
      // videoFile NÃO será enviado aqui
    } = formData;

    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          instrument,
          second_instrument: secondInstrument || null,
          experience,
          special_requirements: specialRequirements || null,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

// Atualizar contadores de instrumentos
export const updateInstrumentCount = async (instrumentName) => {
  try {
    const { error } = await supabase.rpc('increment_instrument_count', {
  instrument_name: values.instrument
    });

    if (error) {
      console.error('Erro ao atualizar contador:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Erro inesperado:', err);
    return false;
  }
};
