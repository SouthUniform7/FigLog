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

    <td className="table-image">
      <img src={props.fig.imageUrl} alt={props.fig.name}/>
    </td>

    <td className="table-name">
      {props.fig.name}
    </td>

    <td className="table-set">
      {props.fig.setNumber}
    </td>

    <td className="table-price">
      {props.fig.price}
    </td>

    <td className="table-url">
    <a href= {props.fig.listUrl}>Link</a>
    </td>

    <td className="table-btn">
      <button
        className="btn btn-remove"
        onClick={() => props.handleFigRemove(props.fig.id, props.fig.name)}>
        Remove minifig
      </button>
    </td>
  </tr>
)