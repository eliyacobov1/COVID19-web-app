import React from 'react';
import './App.scss';
import {createApiClient, Country, Ticket} from './api';
import Pagination from './components/Pagination'
import CountryList from "./components/CountryList";

export type AppState = {
	countries?: Country[],
	theme: number,
	numCountries?: number, // total number of countries, used for pagination
	hiddenCountries?: string[], // names of hidden countries
	hoveredCountry?: string, // country which the mouse is hovering over (id)
	search: string;
}

const DARK_MODE = 1
const LIGHT_MODE = 0

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',
		theme: LIGHT_MODE
	}

	searchDebounce: any = null;

	async componentDidMount() {
		this.setState({
			countries: await api.getPage(1, this.state.search),
			numCountries: (await api.getCountries(this.state.search)).length
		});
	}

	/**
	 * event function that hides the ticket with the given id from the user
	 */
	hideCountry = (name: string) => {
		let hiddenCountries;
		if(typeof this.state.hiddenCountries != "undefined") {
			hiddenCountries = [...this.state.hiddenCountries]
			hiddenCountries.push(name)
		}
		else {
			hiddenCountries = [name]
		}
		this.setState({
			hiddenCountries: hiddenCountries
		})
	}

	/**
	 * set the currently hovered over country to be the given ticket
	 */
	setHoveringTicket = (country?: Country) => {
		this.setState({ hoveredCountry: country ? country.name : undefined })
	}

	/**
	 * return true if the ticket with given id is hidden, false otherwise
	 */
	isHidden = (name: string) => {
		let hiddenCountries = this.state.hiddenCountries
		if (typeof hiddenCountries != "undefined"){
			return hiddenCountries.includes(name);
		}
		else{
			return false;
		}
	}

	/**
	 * make all of the hidden tickets visible again
	 */
	restoreTickets() {
		this.setState({
			hiddenCountries: []
		} )
	}

	renderCountryTickets = (countries: Country[]) => {
		return <CountryList app={this} countries={countries}/>
	}

	/**
	 * make a get request and return search results from server
	 */
	onSearch = async (val: string) => {
		clearTimeout(this.searchDebounce);
		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val,
				numCountries: (await api.getCountries(val)).length
			});
		}, 300);
	}

	/**
	 * render the hidden tickets counter and restore button
	 */
	renderHiddenCount = (numHiddenTickets: number) => {
		let suffix = numHiddenTickets>1 ? 's' : ''
		if (numHiddenTickets > 0){
			return <div>&nbsp;({numHiddenTickets} hidden ticket{suffix} -&nbsp;
				<button onClick={() => this.restoreTickets()}> restore</button>)</div>
		}
		else{
			return null
		}
	}

	/**
	 * toggle light-mode and dark-mode
	 */
	toggleDarkMode = () => {
		document.body.classList.toggle('dark-mode')
		let theme = this.state.theme
		this.setState({
			theme: theme === LIGHT_MODE  ? DARK_MODE : LIGHT_MODE
		})
	}

	render() {
		const {countries, hiddenCountries, theme, numCountries} = this.state;
		const numHiddenCountries = hiddenCountries ? hiddenCountries.length : 0;

		return (
			<div id="wrapper"> {/* ensures everything stays in place on window resize */}
				<main>
				<h1>COVID19 For Tourists</h1>
				{/* Dark mode button */}
				<h4 className='btn btn-outline-secondary dark-mode-btn' onClick={() => this.toggleDarkMode()}>Toggle {theme === LIGHT_MODE  ? 'Dark' : 'Light'} Mode</h4>
				<header>
					<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)}/>
				</header>
				<div className='results wrapper-row'>
				{countries ? <div>Showing {countries.length-numHiddenCountries} results</div> : null }
				{this.renderHiddenCount(numHiddenCountries)}
				</div>
				{/*{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}*/}
				{countries ? this.renderCountryTickets(countries) : <h2>Loading..</h2>}
				{/* render pagination component only when there is more than 1 page */}
				{countries && countries.length > 0 && countries.length < (numCountries || 0) &&
				<div className='page-section'><Pagination api={api} app={this}/></div>}
				</main>
			</div>)
	}
}

export default App;