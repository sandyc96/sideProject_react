import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import allCounties from '../../countyData.json';
import allCities from '../../cityData.json';

export default function RegionSelect() {
  const [selectedCountyId, setSelectedCountyId] = useState('');

  const [selectedCityId, setSelectedCityId] = useState('');

  const handleCountyChange = (event) => {
    const newCounty = event.target.value;
    setSelectedCountyId(newCounty);
  };

  const cities = allCities.filter((city) => {
    const name = city.欄位2;
    return name.startsWith(selectedCountyId, 0);
  });

  const handleCityChange = (event) => {
    setSelectedCityId(event.target.value);
  };

  return (
    <>
      <Grid size={6}>
        <FormControl fullWidth>
          <InputLabel id='county-select-label'>選擇縣市</InputLabel>
          <Select
            labelId='county-select-label'
            id='county-select'
            size='small'
            value={selectedCountyId}
            label='選擇縣市'
            onChange={handleCountyChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: '50vh',
                },
              },
            }}
          >
            {allCounties.map((county) => (
              <MenuItem key={county.HSN_NM} value={county.HSN_NM}>
                {county.HSN_NM}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={6}>
        <FormControl fullWidth disabled={!selectedCountyId}>
          <InputLabel id='county-select-label'>選擇鄉鎮市區</InputLabel>
          <Select
            labelId='county-select-label'
            id='county-select'
            size='small'
            value={selectedCityId}
            label='選擇鄉鎮市區'
            onChange={handleCityChange}
          >
            {selectedCountyId &&
              cities.map((city) => (
                <MenuItem key={city.欄位2} value={city.欄位2.slice(3)}>
                  {city.欄位2.slice(3)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}
