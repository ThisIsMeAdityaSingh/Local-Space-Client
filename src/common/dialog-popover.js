import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Dialog } from 'evergreen-ui'

function DialogPopover({title, content, isShown, onClose, closeButtonText}){
    return <Pane>
        <Dialog
            isShown={isShown}
            title={title}
            onCloseComplete={onClose}
            confirmLabel={closeButtonText}
            hasCancel={false}
        >
            {content}
        </Dialog>
    </Pane>;
}

DialogPopover.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    isShown: PropTypes.bool,
    onClose: PropTypes.func,
    closeButtonText: PropTypes.string
};

DialogPopover.defaultProps = {
    title: "Dialog title",
    content: "Dialog content",
    isShown: true,
    onClose: () => {},
    closeButtonText: "Close"
};

export default DialogPopover;