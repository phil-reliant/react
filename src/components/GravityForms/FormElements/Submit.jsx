import React from 'react';
import ArrowNoStem from '../../../assets/svgs/arrow-no-stem';

const Submit = ({
 Button, Loading, formData, isDisabled, submitting, prevStep
}) => {
  const SButton = Button || 'button';

  return (
    <React.Fragment>
      <div className="footer">
        <input type="hidden" name="nonce" value={formData.nonce} />
        <div className={`buttons`}>
          <SButton type="submit" mr={20} className={`button --standard --left`} disabled={isDisabled || submitting}>
            <span>{formData.button.text}</span>
            <div className={`arrow-icon`}>
              <ArrowNoStem />
            </div>
          </SButton>
          {formData.lastPageButton && (
            <SButton className="prev" onClick={e => prevStep(e)}>
              {formData.lastPageButton.text}
            </SButton>
          )}
        </div>
        {Loading && <Loading isLoading={submitting} />}
      </div>
    </React.Fragment>
  );
};

export default Submit;
