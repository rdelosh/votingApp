import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const PageWrapper = Page => { 

    return props =>
    <div className="page">
        <CSSTransitionGroup
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={200}
            transitionName="SlideIn"
        > 
                <Page {...props} /> 
        </CSSTransitionGroup>
    </div>
};
export default PageWrapper;