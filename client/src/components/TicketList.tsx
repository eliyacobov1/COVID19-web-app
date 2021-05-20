import React from "react";
import App from "../App";
import {Ticket} from "../api";

/**
 * this component renders each ticket in the array tickets
 */
const TicketList = (props: {
    app: App,
    tickets: Ticket[],
}) => {
    const app = props.app;  // main App component
    // Q1.b, render a ticket only if it is not hidden
    return (<ul className='tickets'>
        {props.tickets.map((ticket) => (app.isHidden(ticket.id) ? null:
            <li key={ticket.id} className={'ticket'}
                onMouseOver={() => app.setHoveringTicket(ticket)}  onMouseLeave={() => app.setHoveringTicket()}>
                {/* ticket starts here*/}
                {app.state.hoveredTicket === ticket.id && <button onClick={()=>app.hideTicket(ticket.id)}>Hide</button>}
                <h5 className='title'>{ticket.title}</h5>
                {/* Q1.d, only 3 lines of the ticket are visible by default*/}
                <div><h5 className='content'>{ticket.content}</h5></div>
                <footer>
                    <div className='wrapper-row'>
                        <div className='meta-data'>By {ticket.userEmail} | { new Date(ticket.creationTime).toLocaleString()}</div>
                        {/* ticket labels */}
                        {ticket.labels ? ticket.labels.map((label) => (
                            <span className='label'>{label}</span>)) : null}
                    </div>
                    <div className='wrapper-row'>
                    {/* clone button */}
                    <button onClick={() => null} className='bottom-right-btn bg-success'>
                        clone</button>
                    </div>
                </footer>
                {/* ticket ends here*/}
            </li>))}
    </ul>);
}

export default TicketList;