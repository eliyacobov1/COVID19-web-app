import React from 'react';
import './App.scss';
import {createApiClient, Country, Corona_policy, Ticket} from './api';
import Pagination from './components/Pagination'
import TicketList from "./components/TicketList";
import CountryList from "./components/CountryList";

export type AppState = {
	countries?: Country[],
	tickets?: Ticket[],
	theme: number,
	numTickets?: number, // total number of tickets, used for pagination
	hiddenTickets?: string[], // ids of hidden tickets
	hoveredTicket?: string, // ticket which the mouse is hovering over (id)
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
			// countries: await api.getPage(1, this.state.search),
			tickets: await api.getPage(1, this.state.search),
			numTickets: (await api.getTickets(this.state.search)).length
		});
	}

	/**
	 * (Q1.b) event function that hides the ticket with the given id from the user
	 */
	hideTicket = (id: string) => {
		let hiddenTickets;
		if(typeof this.state.hiddenTickets != "undefined") {
			hiddenTickets = [...this.state.hiddenTickets]
			hiddenTickets.push(id)
		}
		else {
			hiddenTickets = [id]
		}

		this.setState({
			hiddenTickets: hiddenTickets
		})
	}

	/**
	 * set the currently hovered over ticket to be the given ticket
	 */
	setHoveringTicket = (ticket?: Ticket) => {
		this.setState({
			hoveredTicket: ticket ? ticket.id : undefined
		})
	}

	/**
	 * set the currently hovered over country to be the given ticket
	 */
	setHoveringCountry = (country?: Country) => {
		this.setState({
			hoveredTicket: country ? country.name : undefined
		})
	}

	/**
	 * (Q1.b) return true if the ticket with given id is hidden, false otherwise
	 */
	isHidden = (id: string) => {
		let hiddenTickets = this.state.hiddenTickets
		if (typeof hiddenTickets != "undefined"){
			return hiddenTickets.includes(id);
		}
		else{
			return false;
		}
	}

	/**
	 * (Q1.b) make all of the hidden tickets visible again
	 */
	restoreTickets() {
		this.setState({
			hiddenTickets: []
		} )
	}

	renderTickets = (tickets: Ticket[]) => {
		return <TicketList app={this} tickets={tickets}/>
	}

	renderCountryTickets = (countries: Country[]) => {
		return <CountryList app={this} countries={countries}/>
	}

	/**
	 * 2.d make a get request and return search results from server
	 */
	onSearch = async (val: string) => {
		clearTimeout(this.searchDebounce);
		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val,
				tickets: await api.getPage(1, val),
				numTickets: (await api.getTickets(val)).length
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
		const {tickets, countries, hiddenTickets, theme, numTickets} = this.state;
		const numHiddenTickets = hiddenTickets ? hiddenTickets.length : 0;

		return (
			<div id="wrapper"> {/* ensures everything stays in place on window resize */}
				<main>
				<h1>COVID19 For Tourists</h1>
				{/* Q1.c Dark mode button */}
				<h4 className='btn btn-outline-secondary dark-mode-btn' onClick={() => this.toggleDarkMode()}>Toggle {theme === LIGHT_MODE  ? 'Dark' : 'Light'} Mode</h4>
				<header>
					<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)}/>
				</header>
				<div className='results wrapper-row'>
				{tickets ? <div>Showing {tickets.length-numHiddenTickets} results</div> : null }
				{this.renderHiddenCount(numHiddenTickets)}
				</div>
				{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
				{countries ? this.renderCountryTickets(countries) : <h2>Loading..</h2>}
				{/* render pagination component only when there is more than 1 page */}
				{tickets && tickets.length > 0 && tickets.length < (numTickets || 0) &&
				<div className='page-section'><Pagination api={api} app={this}/></div>}
				</main>
			</div>)
	}
}

export default App;