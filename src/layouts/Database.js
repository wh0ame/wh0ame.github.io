import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Database() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // Добавление данных
async function addData() {
  const { data, error } = await supabase
    .from('apartments')
    .insert([{ title: 'New Apartment', price: 100000 }]);
  
  if (error) console.error('Error adding data:', error);
  else fetchData(); // Обновляем список
}

// Обновление данных
async function updateData(id) {
  const { error } = await supabase
    .from('apartments')
    .update({ price: 120000 })
    .eq('id', id);
  
  if (error) console.error('Error updating data:', error);
  else fetchData();
}

// Удаление данных
async function deleteData(id) {
  const { error } = await supabase
    .from('apartments')
    .delete()
    .eq('id', id);
  
  if (error) console.error('Error deleting data:', error);
  else fetchData();
} 

  async function fetchData() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('your_table_name')
        .select('*');
      
      if (error) throw error;
      if (data) setData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Database;