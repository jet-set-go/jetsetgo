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
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ActionPromptProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  actions: PromptAction[];
}

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
