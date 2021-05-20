import React from "react";
import App from "../App";
import {Country} from "../api";

let riskLevelStr = (riskLevel: number) => {
    switch (riskLevel){
        case 1:
            return "Level 1: COVID-19 Low"
        case 2:
            return "Level 2: COVID-19 Moderate"
        case 3:
            return "Level 3: COVID-19 High"
        case 4:
            return "Level 4: COVID-19 Very High"
        default:
            return "Level Unknown: COVID-19 Unknown"
    }
}


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
                onMouseOver={() => app.setHoveringTicket(country)} onMouseLeave={() => app.setHoveringTicket()}>
                {/* ticket starts here*/}
                {app.state.hoveredCountry === country.name && <button onClick={()=>app.hideCountry(country.name)}>Hide</button>}
                <h5 className='title'>{country.name} {riskLevelStr(country.risk_rate)}</h5>
                <div className='wrapper-row'>
                    <div className='meta-data'>Last update date: { country.update_date }</div>
                    {/* country restrictions */}
                    {country.restrictions ? country.restrictions.map((res) => (
                        <span className='label'>{res}</span>)) : null}
                </div>
                <div><h5 className='content'>{country.content ? country.content : null}</h5></div>
                <footer>
                    <div className='wrapper-row'>
                        {/* show page button */}
                        <button onClick={() => null} className='bottom-right-btn bg-success'>
                            Open Country Page</button>
                    </div>
                </footer>
                {/* ticket ends here*/}
            </li>))}
    </ul>);
}

export default CountryList;