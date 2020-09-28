import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from '../Button';

const FAQAccordion = props => {
	const {
		faqEntries,
		sectionTitle,
		backgroundColor
	} = props;

	const [selectedEntry, setSelectedEntry] = useState(-1);

	const entryClicked = (index) => {
		if (selectedEntry === index) {
			// if this entry is already selected, then unselect it so that it closes
			setSelectedEntry(-1);
		} else {
			setSelectedEntry(index);
		}
	}

	const entries = faqEntries.map((item, index) => {
		return (
			<div key={`faq-heading-${index}`}
				className={`faq-accordion--entries--entry bg-${backgroundColor}`}>
				<p className={`faq-accordion--entries--entry--faq-question ${index === selectedEntry ? 'active' : ''}`}
					onClick={() => { entryClicked(index) }}>
					{item.question}
				</p>
				<div className={`faq-accordion--entries--entry--faq-answer ${index === selectedEntry ? 'active' : 'inactive'}`}>
					<div className={`faq-accordion--entries--entry--faq-answer__inner`}
						dangerouslySetInnerHTML={{ __html: item.answer }} />
					<Button
						buttons={item.buttons}
						alignment={item.buttonAlignment}
						type={item.buttonType} />
				</div>
			</div>
		);
	});

	return (
		<div className={`faq-accordion`}>
			{ sectionTitle ?
				<div className="container faq-accordion--heading">
					<div className="row">
						<div className="col-12">
							<h4>{sectionTitle}</h4>
						</div>
					</div>
				</div>
			: null}
			<div className="container faq-accordion--entries">
				<div className="row">
					<div className="col-12">
						{entries}
					</div>
				</div>
			</div>
		</div>
	);
};

FAQAccordion.propTypes = {
	faqEntries: PropTypes.array.isRequired,
	sectionTitle: PropTypes.string
};

export default FAQAccordion;
