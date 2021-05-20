import React from "react";
import App from "../App";
import {Country} from "../api";

/**
 * this component renders each country in the country array
 */
const CountryList = (props: {
    app: App,
    countries: Country[],
}) => {
    const app = props.app;  // main App component
    // render a ticket only if it is not hidden
    return (<ul className='tickets'>
        {props.countries.map((country) => (app.isHidden(country.name) ? null:
            <li key={country.name} className={'comment'}
                onMouseOver={() => app.setHoveringCountry(country)}  onMouseLeave={() => app.setHoveringTicket()}>
                {/* ticket starts here*/}
                {app.state.hoveredTicket === country.name && <button onClick={()=>app.hideTicket(country.name)}>Hide</button>}
                <h5 className='title'>{country.name}</h5>
                {/* only 3 lines of the ticket are visible by default*/}
                <div><h5 className='content'>{country.content}</h5></div>
                <footer>
                    <div className='wrapper-row'>
                        <div className='meta-data'>Last update date: { new Date(country.update_date).toLocaleString()}</div>
                        {/* country restrictions */}
                        {country.restrictions ? country.restrictions.map((res) => (
                            <span className='label'>{res}</span>)) : null}
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

export default CountryList;