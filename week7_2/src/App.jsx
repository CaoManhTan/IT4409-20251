import './App.css'
import SearchForm from './components/SearchForm'
import ResultTable from './components/ResultTable'
import React, { useState, useEffect } from "react"

function App() {
  const [studentId, setStudenID] = useState('');
  const [studentName, setStudentName] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      const [resSv, resHP, resKQ] = await Promise.all([
        fetch('/sinhvien.json'),
        fetch('/hocphan.json'),
        fetch('/ketqua.json')
      ]);
      const [sinhvien, hocphan, ketqua] = await Promise.all([
        resSv.json(),
        resHP.json(),
        resKQ.json()
      ]);

      return { sinhvien, hocphan, ketqua };
    }
    catch (e) {
      throw new Error(e);
    }
  };
  const handleSearch = async (data) => {
    const { sinhvien, hocphan, ketqua } = await fetchData();
    setStudenID(data);
    const finalsv = sinhvien.filter(sv => {
      return sv.sid === data;
    })
    const finalResults = ketqua
      .filter(kq => kq.sid.toUpperCase() === data.toUpperCase()
      ).map(kq => {
        const course = hocphan.find(hp => hp.cid.toUpperCase() === kq.cid.toUpperCase())
        return {
          ...kq,
          name: course.name,
          credits: course.credits
        }
      })
    setResults(finalResults);
    setLoading(false);
  }


  return (
    <>
      <SearchForm
        onSearch={(data) => handleSearch(data)}
      />
      {results && !loading && (
        <ResultTable
          results={results}
        />
      )}

    </>
  )
}

export default App
