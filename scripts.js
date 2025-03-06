document.addEventListener('DOMContentLoaded', function() {
    const conversionTypeSelect = document.getElementById('conversion-type');
    const inputUnitSelect = document.getElementById('input-unit');
    const outputUnitSelect = document.getElementById('output-unit');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');
    const resetBtn = document.getElementById('reset-btn');
    const inputValue = document.getElementById('input-value');
    const outputValue = document.getElementById('output-value');
    const modeToggle = document.getElementById('mode-toggle');

    const unitData = {
        currency: ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD', 'CHF', 'LKR'],
        volume: ['Liters', 'Milliliters', 'Cubic Meters', 'Gallons', 'Quarts'],
        length: ['Meters', 'Kilometers', 'Centimeters', 'Inches', 'Feet'],
        temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
        area: ['Square Meters', 'Hectares', 'Acres', 'Square Kilometers', 'Square Miles'],
        speed: ['Meters/Second', 'Kilometers/Hour', 'Miles/Hour', 'Knots'],
        time: ['Seconds', 'Minutes', 'Hours', 'Days']
    };

    function populateUnits(type) {
        inputUnitSelect.innerHTML = '';
        outputUnitSelect.innerHTML = '';
        unitData[type].forEach(unit => {
            const option1 = document.createElement('option');
            option1.value = unit;
            option1.textContent = unit;
            inputUnitSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = unit;
            outputUnitSelect.appendChild(option2);
        });
    }

    function convert() {
        const type = conversionTypeSelect.value;
        const inputUnit = inputUnitSelect.value;
        const outputUnit = outputUnitSelect.value;
        const value = parseFloat(inputValue.value);

        if (isNaN(value) || value <= 0) {
            outputValue.textContent = 'Please enter a valid value!';
            return;
        }

        let result = 0;

        switch (type) {
            case 'currency':
                const rates = {
                    USD: { LKR: 200, EUR: 0.85, GBP: 0.75 },
                    EUR: { USD: 1.18, LKR: 235, GBP: 0.88 },
                    LKR: { USD: 0.005, EUR: 0.0043, GBP: 0.0037 },
                };
                result = value * (rates[inputUnit] && rates[inputUnit][outputUnit] ? rates[inputUnit][outputUnit] : 1);
                break;
                case 'volume':
                    // Volume conversion logic
                    const volumeInput = parseFloat(inputValue);
                
                    if (fromUnit === 'liters' && toUnit === 'milliliters') {
                        result = volumeInput * 1000;
                    } else if (fromUnit === 'milliliters' && toUnit === 'liters') {
                        result = volumeInput / 1000;
                    } else if (fromUnit === 'liters' && toUnit === 'cubic meters') {
                        result = volumeInput / 1000;
                    } else if (fromUnit === 'cubic meters' && toUnit === 'liters') {
                        result = volumeInput * 1000;
                    } else if (fromUnit === 'gallons' && toUnit === 'liters') {
                        result = volumeInput * 3.78541;
                    } else if (fromUnit === 'liters' && toUnit === 'gallons') {
                        result = volumeInput / 3.78541;
                    } else {
                        result = "Invalid conversion units for volume.";
                    }
                    break;
                
                    case 'length':
                        // Length conversion logic
                        const lengthInput = parseFloat(inputValue);
                    
                        if (fromUnit === 'meters' && toUnit === 'kilometers') {
                            result = lengthInput / 1000;
                        } else if (fromUnit === 'kilometers' && toUnit === 'meters') {
                            result = lengthInput * 1000;
                        } else if (fromUnit === 'centimeters' && toUnit === 'meters') {
                            result = lengthInput / 100;
                        } else if (fromUnit === 'meters' && toUnit === 'centimeters') {
                            result = lengthInput * 100;
                        } else if (fromUnit === 'inches' && toUnit === 'centimeters') {
                            result = lengthInput * 2.54;
                        } else if (fromUnit === 'centimeters' && toUnit === 'inches') {
                            result = lengthInput / 2.54;
                        } else if (fromUnit === 'feet' && toUnit === 'meters') {
                            result = lengthInput * 0.3048;
                        } else if (fromUnit === 'meters' && toUnit === 'feet') {
                            result = lengthInput / 0.3048;
                        } else {
                            result = "Invalid conversion units for length.";
                        }
                        break;
                    
            case 'temperature':
                if (inputUnit === 'Celsius' && outputUnit === 'Fahrenheit') {
                    result = (value * 9/5) + 32;
                } else if (inputUnit === 'Fahrenheit' && outputUnit === 'Celsius') {
                    result = (value - 32) * 5/9;
                } else if (inputUnit === 'Celsius' && outputUnit === 'Kelvin') {
                    result = value + 273.15;
                } else if (inputUnit === 'Kelvin' && outputUnit === 'Celsius') {
                    result = value - 273.15;
                } else if (inputUnit === 'Fahrenheit' && outputUnit === 'Kelvin') {
                    result = (value - 32) * 5/9 + 273.15;
                } else if (inputUnit === 'Kelvin' && outputUnit === 'Fahrenheit') {
                    result = (value - 273.15) * 9/5 + 32;
                }
                break;
                case 'area':
                    const areaConversions = {
                        'Square Meters': 1,
                        'Hectares': 10000,
                        'Acres': 4046.86,
                        'Square Kilometers': 1e6,
                        'Square Miles': 2.59e6
                    };
                    result = value * areaConversions[inputUnit] / areaConversions[outputUnit];
                    break;
                    case 'speed':
                        const speedConversions = {
                            'Meters/Second': 1,
                            'Kilometers/Hour': 3.6,
                            'Miles/Hour': 2.237,
                            'Knots': 1.944
                        };
                        result = value * speedConversions[inputUnit] / speedConversions[outputUnit];
                        break;
                    
                        case 'time':
                            const timeConversions = {
                                'Seconds': 1,
                                'Minutes': 60,
                                'Hours': 3600,
                                'Days': 86400
                            };
                            result = value * timeConversions[inputUnit] / timeConversions[outputUnit];
                            break;
                        
        }

        outputValue.textContent = `${value} ${inputUnit} = ${result} ${outputUnit}`;
    }

    modeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', modeToggle.checked);
    });

    conversionTypeSelect.addEventListener('change', function() {
        populateUnits(conversionTypeSelect.value);
    });

    convertBtn.addEventListener('click', convert);
    swapBtn.addEventListener('click', function() {
        const temp = inputUnitSelect.value;
        inputUnitSelect.value = outputUnitSelect.value;
        outputUnitSelect.value = temp;
        convert();
    });

    resetBtn.addEventListener('click', function() {
        inputValue.value = '';
        outputValue.textContent = '';
        populateUnits(conversionTypeSelect.value);
    });

    populateUnits(conversionTypeSelect.value);
});

