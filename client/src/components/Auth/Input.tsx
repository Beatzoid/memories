import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, InputAdornment, TextField, IconButton } from "@mui/material";

interface InputProps {
    half?: boolean;
    name: string;
    label: string;
    handleChange: () => any;
    handleShowPassword?: () => any;
    autoFocus?: boolean;
    type?: React.HTMLInputTypeAttribute;
}

const Input = ({
    half,
    name,
    handleChange,
    label,
    autoFocus,
    type,
    handleShowPassword
}: InputProps) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={
                    name === "password"
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton onClick={handleShowPassword}>
                                          {type === "password" ? (
                                              <Visibility />
                                          ) : (
                                              <VisibilityOff />
                                          )}
                                      </IconButton>
                                  </InputAdornment>
                              )
                          }
                        : undefined
                }
            />
        </Grid>
    );
};

export default Input;
