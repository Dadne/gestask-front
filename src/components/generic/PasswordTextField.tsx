import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import {useState} from 'react';

const PasswordTextField = ({  ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { label, sx,fullWidth, setData, error} = props;

    const handleToggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <FormControl fullWidth={fullWidth} sx={sx} variant="outlined">
          <InputLabel htmlFor="password">{label}</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            error={error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleToggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => {
                if (setData) {
                    setData(e.target.value);
                }
            }}
          />
          {error && (
            <FormHelperText error>
              {error}
            </FormHelperText>
          )}
        </FormControl>
    );

}

export default PasswordTextField;