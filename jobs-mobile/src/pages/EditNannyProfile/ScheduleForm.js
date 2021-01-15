import React, {useEffect, useState} from 'react'
import {View, TextInput, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const ScheduleForm = ({position, callbackFunction}) => {

    const [year, setYear] = useState(new Date().getFullYear().toString())
    const [day, setDay] = useState(new Date().getDate().toString());
    const [month, setMonth] = useState('')
    const [startHour, setStartHour] = useState('')
    const [finishHour, setFinishHour] = useState('')
    const [months, setMonths] = useState([
        {label: 'January', value: '01'},
        {label: 'February', value: '02'},
        {label: 'March', value: '03'},
        {label: 'April', value: '04'},
        {label: 'May', value: '05'},
        {label: 'June', value: '06'},
        {label: 'July', value: '07'},
        {label: 'August', value: '08'},
        {label: 'September', value: '09'},
        {label: 'October', value: '10'},
        {label: 'November', value: '11'},
        {label: 'December', value: '12'}
    ])
    const [possibleHours, setPossibleHours] = useState([
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00'
    ])
    useEffect(() => {
        callbackFunction(position,'month_day', `${month}_${day}`)
    },[month, day])

    function selectYear(selectedYear){
        if(Number(selectedYear) < Number(year) ){
            return;
        }
        setYear(selectedYear);
        callbackFunction(position, 'year', selectedYear)
    }

    function selectDay(selectedDay){
        if(selectedDay < 32 && selectedDay > 0){
            setDay(selectedDay)
        }
        return;
    }

    return(
<View>
    <Text>Select year</Text>
    <TextInput
    value={year} 
    keyboardType='numeric'
    onChangeText={(value) => selectYear(value)}
    ></TextInput>
    <Text>Select day and month</Text>
    <TextInput
    value={day}
    keyboardType='numeric'
    onChangeText={(value) => selectDay(value) }
    ></TextInput>
    <Text>/</Text>
    <Picker
        selectedValue= ''
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemposition) =>
          setMonth(itemValue)
        }>
        {
            months.map(month => {
                <Picker.Item key={month.value} label={month.label} value={month.value} />
            })
        }
    </Picker>
    <Text>Start hour</Text>
    <Picker
        selectedValue= ''
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemposition) =>
          {setStartHour(itemValue)
            callbackFunction(position, 'from', itemValue) }
        }>
        {
            possibleHours.map(hour => {
                <Picker.Item key={hour} label={hour} value={hour} />
            })
        }
    </Picker>
    <Text>Finish hour</Text>
    <Picker
        selectedValue= ''
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemposition) =>
          {setFinishHour(itemValue)
           callbackFunction(position, 'to', itemValue) }
        }>
        {
            possibleHours.map(hour => {
                <Picker.Item key={hour} label={hour} value={hour} />
            })
        }
    </Picker>
</View>
    )
}

export default ScheduleForm;