// Import deps
import React from 'react'

// Import components
import { FigListRow } from './fig-list-row'

// Import styles
import './../styles/fig-list.css'

// Create interfaces
interface FigUI {
    id: number;
    imageUrl: string;
    name: string;
    setNumber: string;
    price: string;
    listUrl: string;
}

interface FigListUI {
  figs: FigUI[];
  loading: boolean;
  handleFigRemove: (id: number, name: string) => void;
}

// Create FigList component
export const FigList = (props: FigListUI) => {
  // Show loading message
  if (props.loading) return <p>Leaderboard table is loading...</p>

  return (
    <table className="table">
        <thead className="table-head">
          <tr className="head-row">
            <th className="table-head-num" />

            <th className="table-head-image">Image</th>

            <th className="table-head-name">Name</th>

            <th className="table-head-set">Set Number</th>

            <th className="table-head-price">Price</th>

            <th className="table-head-url">List Url</th>

            <th className="table-head-nonce" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.figs.length > 0 ? (
            props.figs.map((fig: FigUI, idx) => (
              <FigListRow
                key={fig.id}
                fig={fig}
                position={idx + 1}
                handleFigRemove={props.handleFigRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={7}>There are no minifigs to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}