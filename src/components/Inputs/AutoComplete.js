import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

export default function AutocompleteInput({ options, onChange, value, id, placeholder }) {
    const [text, setText] = React.useState(value ? value.nom : "");

    React.useEffect(() => {
        const it = options.find(
            op => {
                if (op.nom && text !== "") {
                    return op.nom.indexOf(text) !== -1
                }                
                return false;
            }
        );
        onChange(it);
    }, [options, text]);

    return (
        <Autocomplete
            id={id}
            size="small"
            fullWidth
            onSelect={e => {
                setText(e.target.value);
            }}
            options={options}
            getOptionLabel={(option) => option.nom}
            renderInput={(params) => (
                <TextField {...params}
                    value={text}
                    placeholder={placeholder}
                    onChange={e => setText(e.target.value)}
                    color="default" margin="normal" />
            )}
            renderOption={(props, option, { inputValue }) => {
                const matches = match(option.nom, inputValue);
                const parts = parse(option.nom, matches);

                return (
                    <li {...props}>
                        <div>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                    }}
                                >
                                    {part.text}
                                </span>
                            ))}
                        </div>
                    </li>
                );
            }}
        />
    );
}