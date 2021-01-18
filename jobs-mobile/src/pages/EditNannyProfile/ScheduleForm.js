import React, {useEffect, useState} from 'react'
import {View, TextInput, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';

const ScheduleForm = ({position, callbackFunction}) => {

    const [year, setYear] = useState(new Date().getFullYear().toString())
    const [day, setDay] = useState(new Date().getDate().toString());
    const [month, setMonth] = useState('01')
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
        setYear(selectedYear);
        callbackFunction(position, 'year', selectedYear)
    }

    function selectDay(selectedDay){
        setDay(selectedDay)
    }

    return(
<View style={position > 0 && styles.scheduleFormItem}>
    <Text>Date</Text>
    <View style={styles.verticalBox}>
        <TextInput
        style={styles.rateInput }
        value={year} 
        keyboardType='numeric'
        onChangeText={(value) => selectYear(value)}
        ></TextInput>
        <TextInput
        style={[styles.rateInput, {width:30}] }
        value={day}
        keyboardType='numeric'
        onChangeText={(value) => selectDay(value) }
        ></TextInput>
        <Text style={{lineHeight:50}}>/</Text>
        <Picker
            selectedValue= {month}
            style={[styles.rateInput,{width: 150}]}
            onValueChange={(itemValue, itemposition) =>
              setMonth(itemValue)
            }>       
            {
                months.map(month => {
                    return(
                        <Picker.Item key={month.value} label={month.label} value={month.value} />
                    )
                })
            }
        </Picker>
    </View>
    <Text>Start hour</Text>
    <Picker
        selectedValue= {startHour}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemposition) =>
          {setStartHour(itemValue)
            callbackFunction(position, 'from', itemValue) }
        }>
        {
            possibleHours.map(hour => {
                return(
                    <Picker.Item key={hour} label={hour} value={hour} />
                )
            })
        }
    </Picker>
    <Text>Finish hour</Text>
    <Picker
        selectedValue= {finishHour}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemposition) =>
          {setFinishHour(itemValue)
           callbackFunction(position, 'to', itemValue) }
        }>
        {
            possibleHours.map(hour => {
                return(
                    <Picker.Item key={hour} label={hour} value={hour} />
                )
            })
        }
    </Picker>
</View>
    )
}

export default ScheduleForm;