import { Button, ButtonProps, CircularProgress, Stack, Typography } from "@mui/material";

type LoadingButtonProps = ButtonProps & {
  loading: boolean;
  loadingText?: string;
};

export default function LoadingButton({ loading, loadingText, ...props }: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <CircularProgress size={25} color="inherit" />
          <Typography>{loadingText ?? "Đang xử lý ..."}</Typography>
        </Stack>
      ) : (
        props.children
      )}
    </Button>
  );
}
