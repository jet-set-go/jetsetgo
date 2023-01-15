import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

export interface PromptAction {
  /**
   * The label of the action button.
   */
  label: string;
  /**
   * A callback function that is invoked when the action button is clicked.
   * @param event 
   * @returns 
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ActionPromptProps {
  /**
   * A boolean indicating whether the prompt should be displayed
   */
  open: boolean;
  /**
   * A callback function that is invoked when the prompt is closed by the user
   */
  onClose: () => void;
  /**
   * The title of the prompt
   */
  title: string;
  /**
   * The text content of the prompt
   */
  content: string;
  /**
   * An array of actions that the user can take. Each action will be displayed as a button and must consist of a label and onClick callback function.
   */
  actions: PromptAction[];
}

/**
 * A MUI-styled prompt that displays a title, content, and a set of actions that the user can take.
 */
const ActionPrompt: React.FC<ActionPromptProps> = ({
  open,
  onClose,
  title,
  content,
  actions,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map((action) => (
          <Button
            key={action.label}
            autoFocus
            onClick={action.onClick}
            color="primary"
          >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default ActionPrompt;
