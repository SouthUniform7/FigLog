// Import deps
import React from 'react'

// Create interfaces
interface FigListRowUI {
  position: number;
  fig: {
    id: number;
    imageUrl: string;
    name: string;
    setNumber: string;
    price: string;
    listUrl: string;
  }
  handleFigRemove: (id: number, title: string) => void;
}

// Create FigListRow component
export const FigListRow = (props: FigListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
      {props.fig.imageUrl}
    </td>

    <td className="table-item">
      {props.fig.name}
    </td>

    <td className="table-item">
      {props.fig.setNumber}
    </td>

    <td className="table-item">
      {props.fig.price}
    </td>

    <td className="table-item">
      {props.fig.listUrl}
    </td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleFigRemove(props.fig.id, props.fig.name)}>
        Remove minifig
      </button>
    </td>
  </tr>
)