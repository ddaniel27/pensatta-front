import React from 'react'
import Food from '../Food/food'
import './style.scss'

export default function AllFood ({ food, setPhase, ...props }) {
  const items = food.filter(({ eaten }) => !eaten)
    .map(({ key, ...item }) => (
      <Food key={key} {...item} {...props} />
    ))

  if (items.length == 0) {
    setPhase(true)
  }

  return (
    <div className="food-all">
      {items}
    </div>
  )
}
