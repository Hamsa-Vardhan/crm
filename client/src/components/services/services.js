import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editService } from '../../redux/actions';
import { Card, Popup, Form, Table, Button, Header, Icon, Segment } from 'semantic-ui-react';
import { createMedia } from '@artsy/fresnel';
import StartServiceModal from './startservicemodal';

const options = [
	{ key: 'Created', text: 'Created', value: 'Created' },
	{ key: 'Open', text: 'Open', value: 'Open' },
	{ key: 'Released', text: 'Released', value: 'Released' },
	{ key: 'In Process', text: 'In Process', value: 'In Process' },
	{ key: 'Cancelled', text: 'New', value: 'New' },
	{ key: 'Completed', text: 'Completed', value: 'Completed' }
];

const { Media, MediaContextProvider } = createMedia({
	breakpoints: {
		nothing: 0,
		tablet: 800
	}
});

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
function Services() {
	const services = useSelector((state) => state.services);
	const dispatch = useDispatch();
	const [ open, setOpen ] = useState(false);

	const handleSelected = (val, key) => {
		setOpen(false);
	};

	const editService = (email) => (
		<Popup
			trigger={<Button icon="edit" content="edit status" primary />}
			hoverable
			flowing
			open={open}
			on="click"
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<Segment>
				<Header>Edit Status</Header>
				<Form>
					<Form.Select
						label="status"
						placeholder="status"
						options={options}
						fluid
						onChange={(e, { value, key }) => handleSelected(value, key)}
					/>
				</Form>
			</Segment>
		</Popup>
	);

	return (
		<div className="container-fluid">
			<div className="row mt-md-5 mb-2 px-0 justify-content-end">
				<StartServiceModal />
			</div>
			<div className="row">
				{services.length ? (
					<MediaContextProvider className="container-fluid">
						<Media at="nothing" className="row justify-content-around">
							{services.map((obj, idx) => (
								<Card className="col-10" key={idx}>
									<Card.Content>{Object.keys(obj).map((v, i) => smallDisplay(v, obj))}</Card.Content>
									<Card.Content className="row justify-content-around">
										{editService(obj['email'])}
									</Card.Content>
								</Card>
							))}
						</Media>
						<Media at="tablet" className="row">
							<Table celled>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell textAlign="center">index</Table.HeaderCell>
										{Object.keys(services[0]).map((v, index) => (
											<Table.HeaderCell key={index}>{v}</Table.HeaderCell>
										))}
									</Table.Row>
								</Table.Header>
								<Table.Body style={{ cursor: 'pointer' }}>
									{services.map((obj, idx) => (
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
											<Segment>
												<Header>Edit Status</Header>
												<Form>
													<Form.Select
														label="user"
														placeholder="user"
														options={options}
														onChange={(e, { value, key }) => handleSelected(value, key)}
													/>
												</Form>
											</Segment>
										</Popup>
									))}
								</Table.Body>
							</Table>
						</Media>
					</MediaContextProvider>
				) : (
					<Header as="h1" color="orange">
						No services available. Add a lead to view
					</Header>
				)}
			</div>
		</div>
	);
}

export default Services;