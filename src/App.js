import React, { useState, useEffect, useMemo } from 'react';

function App() {
   const [techs, setTech] = useState([]);

   const [newTech, setNewTech] = useState();

   function handleAdd() {
      setTech([...techs, newTech]);
      setNewTech('');
   }

   // executa apenas 1x, pois o array de monitoramento está vazio
   useEffect(() => {
      const storageTechs = localStorage.getItem('techs');

      if (storageTechs){
         setTech(JSON.parse(storageTechs));
      }

      // para executar a função apeans quando o componente deixar de existir
      // tb usado para destruir um listener, apenas usando document.removeEventListener() dentro da função
      //return () => {};
   }, []);

   // adiciona sempre que tiver alteração no techs
   useEffect(() => {
      localStorage.setItem('techs', JSON.stringify(techs));
   }, [techs]);

   //só executa quando o techs mudar, no caso, sempre que houver alguma alteração na dependencia ele executa a função
   const techsSize = useMemo(() => techs.length, [techs]);

   return (
      <>
         <ul>
            {techs.map(t => (
               <li key={t}>{t}</li>
            ))}
         </ul>
         <strong>Você tem { techsSize } tecnologias </strong>
         <br />
         <input value={newTech} onChange={e => setNewTech(e.target.value)}/>
         <button type="button" onClick={handleAdd}>Adicionar</button>
      </>
  );
}

export default App;
