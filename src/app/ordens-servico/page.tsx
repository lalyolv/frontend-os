'use client'

import { useEffect, useState } from 'react'
import api from '@/services/api'

export default function OrdensServico() {
  interface OrdemServico {
    id: number
    descricao: string
    checklist: string[]
    imagemUrl?: string
  }

  const [ordens, setOrdens] = useState<OrdemServico[]>([])
  const [descricao, setDescricao] = useState('')
  const [checklist, setChecklist] = useState('')
  const [imagemUrl, setImagemUrl] = useState('')

  useEffect(() => {
    async function fetchOrdens() {
      try {
        const response = await api.get("/ordens-servico")
        setOrdens(response.data)
      } catch (error) {
        console.error("Erro ao buscar ordens:", error)
      }
    }
    fetchOrdens()
  }, [])

  const handleCriarOrdem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/ordens-servico", {
        descricao,
        checklist: checklist.split(",").map(item => item.trim()),
        imagemUrl,
      })

      setOrdens([...ordens, response.data])
      setDescricao('')
      setChecklist('')
      setImagemUrl('')
    } catch (error) {
      console.error("Erro ao criar ordem:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl mb-4">Ordens de Serviço</h1>
      <form onSubmit={handleCriarOrdem} className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl mb-4">Criar Nova Ordem</h2>
        <input
          type="text"
          placeholder="Descrição"
          className="w-full p-3 mb-2 border rounded-lg bg-gray-700 text-white"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Checklist (itens separados por vírgula)"
          className="w-full p-3 mb-2 border rounded-lg bg-gray-700 text-white"
          value={checklist}
          onChange={(e) => setChecklist(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL da Imagem (opcional)"
          className="w-full p-3 mb-4 border rounded-lg bg-gray-700 text-white"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Criar Ordem
        </button>
      </form>
      {ordens.length > 0 ? (
        <ul>
          {ordens.map((ordem: any) => (
            <li key={ordem.id} className="border p-4 rounded mb-2 bg-gray-800">
              <h3 className="text-lg font-bold">{ordem.descricao}</h3>
              <p className="text-gray-400">Checklist: {ordem.checklist.join(", ")}</p>
              {ordem.imagemUrl && (
                <img src={ordem.imagemUrl} alt="Comprovante" className="mt-2 w-full rounded-lg" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nenhuma OS cadastrada.</p>
      )}
    </div>
  )
}
