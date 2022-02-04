import React from 'react'
import { useParams } from 'react-router-dom'
import AddEditCard from './AddEditCard'

const AddCard: React.FC = () => {
  const { id } = useParams() || ({} as any)

  return <AddEditCard id={id} />
}

export default AddCard
