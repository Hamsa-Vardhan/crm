import React, { useState } from 'react';
import actions from '../../redux/actions';
import { createLead, editLead } from '../../rest.service';
import { useDispatch, useSelector } from 'react-redux';
import CreateLeadModal from './createleadmodal';
import editLeadModal from './editleadmodal';
import { createMedia } from '@artsy/fresnel';
import { Table, Header, Button, Popup, Form, Icon, Card } from 'semantic-ui-react';
import EditLeadModal from './editleadmodal';

const { Media, MediaContextProvider } = createMedia({
	breakpoints: {
		nothing: 0,
		tablet: 800
	}
});
const options = [
	{ key: 'new', text: 'New', value: 'New' },
	{ key: 'Contacted', text: 'Contacted', value: 'Contacted' },
	{ key: 'Qualified', text: 'Qualified', value: 'Qualified' },
	{ key: 'Lost', text: 'Lost', value: 'Lost' },
	{ key: 'Cancelled', text: 'Cancelled', value: 'Cancelled' },
	{ key: 'Confirmed', text: 'Confirmed', value: 'Confirmed' }
];

const smallDisplay = (key, obj) => {
	switch (key) {
		case 'name':
			return <Card.Header className="ml-3 mt-2 text-capitalize">{obj[key]}</Card.Header>;
		case 'email':
			return (
				<Card.Description>
					{' '}
					<Icon name="envelope" color="blue" /> {obj[key]}{' '}
				</Card.Description>
			);
		case 'status':
			return (
				<Card.Description>
					{' '}
					<Icon name="star" color="yellow" />
					<Icon name="star" color="yellow" />
					<Icon name="star" color="yellow" /> <b> {obj[key]} </b>
				</Card.Description>
			);
		default:
			return (
				<Card.Description>
					{' '}
					{key} : {obj[key]}{' '}
				</Card.Description>
			);
	}
};

function Leads() {
	const leads = useSelector((state) => state.leads);
	const dispatch = useDispatch();
	return (
		<div className="container-fluid">
			<div className="row mt-md-5 mb-2 px-0 justify-content-end">
				<CreateLeadModal />
			</div>
			<div className="row">
				{leads.length ? (
					<MediaContextProvider className="container-fluid">
						<Media at="nothing" className="row justify-content-around">
							{leads.map((obj, idx) => (
								<Card className="col-10" key={idx}>
									<Card.Content>{Object.keys(obj).map((v, i) => smallDisplay(v, obj))}</Card.Content>
									<Card.Content className="row justify-content-around">
										<EditLeadModal email={obj['email']} />
										<Button content="make into contact" color="twitter" />
									</Card.Content>
								</Card>
							))}
						</Media>
						<Media at="tablet" className="row">
							<Table celled>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell textAlign="center">index</Table.HeaderCell>
										{Object.keys(leads[0]).map((v, index) => (
											<Table.HeaderCell key={index}>{v}</Table.HeaderCell>
										))}
									</Table.Row>
								</Table.Header>
								<Table.Body style={{ cursor: 'pointer' }}>
									{leads.map((obj, idx) => (
										<Popup
											trigger={
												<Table.Row key={idx}>
													<Table.Cell textAlign="center">{idx}</Table.Cell>
													{Object.keys(obj).map((v, index) => (
														<Table.Cell key={index}>{obj[v]}</Table.Cell>
													))}
												</Table.Row>
											}
											very
											flowing
											hoverable
											position="bottom center"
										>
											<Card>
												<Card.Content>
													<Card.Header>{obj.name}</Card.Header>
													<Card.Meta>{obj.email}</Card.Meta>
												</Card.Content>
												<Card.Content>
													<Form>
														<Form.Select
															label="status"
															placeholder={obj.status}
															options={options}
														/>
														<Form.Button
															content="edit"
															icon="edit"
															type="submit"
															inverted
															color="green"
														/>
													</Form>{' '}
													<span> (or) </span>
												</Card.Content>
												<Card.Content>
													<Button content="make into a contact" inverted color="twitter" />
												</Card.Content>
											</Card>
										</Popup>
									))}
								</Table.Body>
							</Table>
						</Media>
					</MediaContextProvider>
				) : (
					<Header as="h1" color="orange">
						No leads available. Add a lead to view
					</Header>
				)}
			</div>
		</div>
	);
}

export default Leads;
