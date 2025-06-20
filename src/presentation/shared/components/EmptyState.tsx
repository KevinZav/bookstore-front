import { InfoRounded } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";

interface Props {
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>,
  buttonText?: string,
  title: string,
  subtitle: string
}
export const EmptyState = ({ onButtonClick, title, subtitle, buttonText }: Props) => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 4,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        borderRadius: 3,
        width: "xs"
      }}
    >
      <InfoRounded sx={{ fontSize: 48, color: 'primary' }} />
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
      {onButtonClick && (
        <Button
          variant="contained"
          onClick={onButtonClick}
          sx={{ mt: 1, textTransform: 'none' }}
        >
          {buttonText}
        </Button>
      )}
    </Paper>
  )
}

