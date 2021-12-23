import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

const App = () => {

    const funSemestral = () => {
        date.getMonth() > 6 ?
            funSemestral(true) :
            funSemestral(false)
    };

    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);

    const date = new Date();
    const christmas = 548696;

    const {register, watch} = useForm ();

    const [salaryBase, setSalaryBase] = useState(0);
    const [sumPayForExtraHours, setSumPayForExtraHours] = useState(0);
    const [payForBonusRecess, setPayForBonusRecess] = useState(0);
    const [lunchAllowance, setLunchAllowance] = useState(0);
    const [transAllowance, setTransAllowance] = useState(0);
    const [extraHoursForSem, setExtraHoursForSem] = useState(0);
    const [recessBonusPayForSem, setRecessBonusPayForSem] = useState(0);
    const [totalSemestralBonus, setTotalSemestralBonus] = useState(0);
    const [totalServicesBonus, setTotalServicesBonus] = useState(0);
    const [totalValueForBonusConcept, setTotalValueForBonusConcept] = useState(0);
    const [semestralChoice, setSemestralChoice] = useState(0);
    const [christmasBonus, setChristmasBonus] = useState(0);
    const [profitSharing, setProfitSharing] = useState(0);

    const salary = (event) => {
        setSalaryBase(event.target.value);
    }
    const extraHours = (event) => {
        setSumPayForExtraHours(event.target.value);
    }
    const payForBonus = (event) => {
        setPayForBonusRecess(event.target.value);
    }

    //Second semestre: [semestralChoice(true)] - First semestre: [semestralChoice(false)].
    useEffect(()=>{
        salaryBase > 0 ?
            setSemestralChoice(true) : 
            setSemestralChoice(0)

        salaryBase > 0 ? 
            setLunchAllowance(129828) :
            setLunchAllowance(0)

        salaryBase <= 2725578 && salaryBase > 0 ? 
            setTransAllowance(106454) : 
            setTransAllowance(0)
    }, [salaryBase]) 

    useEffect(()=>{
        sumPayForExtraHours > 0 ?
            setExtraHoursForSem(parseInt(parseInt(sumPayForExtraHours) / 6)) :
            setExtraHoursForSem(0)
    }, [sumPayForExtraHours])

    useEffect(() => {
        payForBonusRecess > 0 ?
            setRecessBonusPayForSem(parseInt(parseInt(payForBonusRecess) / 6)) :
            setRecessBonusPayForSem(0)
    }, [payForBonusRecess])

    useEffect(() => {
        totalSemestralBonus > 0 ?
            setTotalServicesBonus(parseInt(parseInt(totalSemestralBonus)*0.583333)):
            setTotalServicesBonus(0)
    },[totalSemestralBonus])

    useEffect(() => {
        semestralChoice ?
            setChristmasBonus(parseInt((parseInt(christmas*1.35))+((parseInt(salaryBase)-(parseInt(christmas*2)))*0.3))) :
            setChristmasBonus(0)   
    }, [semestralChoice, salaryBase])

    useEffect(() => {
        !christmasBonus ?
            setProfitSharing(298106) :
            setProfitSharing(0)
    }, [christmasBonus])
    
    useEffect(() => {    
        salaryBase > 0 ?
            setTotalSemestralBonus(parseInt(lunchAllowance+transAllowance+extraHoursForSem+recessBonusPayForSem+(parseInt(christmasBonus)/6))+parseInt(salaryBase)+(parseInt(profitSharing))) :
            setTotalSemestralBonus(0)

        salaryBase > 0 ?
            setTotalValueForBonusConcept(parseInt(totalServicesBonus+christmasBonus)+parseInt(totalSemestralBonus)) :
            setTotalValueForBonusConcept(0)

    }, [semestralChoice, lunchAllowance, transAllowance, extraHoursForSem, recessBonusPayForSem, christmasBonus, salaryBase, profitSharing, totalServicesBonus, totalSemestralBonus])
    
    //Verification (React Hook Form)
    const firstBox = watch("firstBox");
    const secondBox = watch("secondBox");
    const thirdBox = watch("thirdBox");

    return (
        <div className="container mx-auto w-3/5 border mb-5 rounded bg-white">
            <h1 className="text-2xl p-5 text-center border text-gray-900 bg-gray-200 font-bold">CALCULO PRIMAS SEMESTRALES {!funSemestral ? "PRIMER SEMESTRE" : "SEGUNDO SEMESTRE"} {date.getFullYear()}</h1>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2 text-center p-5">
                    <label className="text-xl font-bold pt-5 m-2 text-center text-gray-600" htmlFor="firstBox">Sueldo básico a Noviembre 30 (*)</label>
                    <br></br>
                    <input {...register("firstBox")} onKeyUp={salary} className="py-2 text-xl border shadow m-2 w-9/12 rounded leading-tight focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500" type="number" placeholder="0" name="firstBox"/> 
                    <p className="text-red-500 text-xs italic">{!firstBox ? "Ingrese un valor numerico" : ""}</p>
                    <br></br>

                    <h1 className="font-bold text-2xl pt-5 text-gray-600">VALORES PROPORCIONALES</h1>
                    <br></br>

                    <label className="text-xl font-bold pt-5 m-2 text-center text-gray-600" htmlFor="secondBox">Suma de lo pagado por horas extras en el semestre</label>
                    <br></br>
                    <input {...register("secondBox")} onKeyUp={extraHours} className="text-xl py-2 shadow border m-2 w-9/12 rounded leading-tight focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500" type="number" placeholder="0"/> 
                    <p className="text-red-500 text-xs italic">{!secondBox ? "Ingrese un valor numerico" : ""}</p>
                    <br></br>
                    <br></br>

                    <label className="text-xl font-bold pt-5 m-2 text-center text-gray-600" htmlFor="thirdBox">Valor pagado por prima de vacaciones en el semestre {!funSemestral ? "(ENERO 1 A JUNIO 30)" : "(JULIO 1 A DICIEMBRE 31)"} </label>
                    <br></br>
                    <input {...register("thirdBox")} onKeyUp={payForBonus} className="text-xl py-2 shadow border m-2 w-9/12 rounded leading-tight focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500" type="number" placeholder="0"/> 
                    <p className="text-red-500 text-xs italic">{!thirdBox ? "Ingrese un valor numerico" : ""}</p>
                </div>
                <div className="w-full sm:w-1/2 pb-5 px-3">
                    <h1 className="text-xl font-bold pt-2 m-2 text-center text-gray-600">Subsidio de almuerzo con efecto prestacional</h1>
                    <h1 className="text-2xl font-bold text-center">{numberFormat2.format(lunchAllowance).replace(/(\.|,)00$/g, '')}</h1>
                    
                    <h1 className="text-xl font-bold pt-5 m-2 text-center text-gray-600">Subsidio de transporte</h1>
                    <h1 className="text-2xl font-bold text-center">{numberFormat2.format(transAllowance).replace(/(\.|,)00$/g, '')}</h1>
                    
                    <h1 className="text-xl font-bold pt-5 m-2 text-center text-gray-600">Horas extras en el semestre</h1>
                    <h1 className="text-2xl font-bold text-center">{numberFormat2.format(extraHoursForSem).replace(/(\.|,)00$/g, '')}</h1>
                    
                    <h1 className="text-xl font-bold pt-5 m-2 text-center text-gray-600">Prima de vacaciones pagadas en el semestre</h1>
                    <h1 className="text-2xl font-bold text-center">{numberFormat2.format(recessBonusPayForSem).replace(/(\.|,)00$/g, '')}</h1>
                    
                    <h1 className="text-xl font-bold pt-5 m-2 text-center text-gray-600">TOTAL PRIMA SEMESTRAL</h1>
                    <h1 className="text-2xl font-bold text-center">{numberFormat2.format(totalSemestralBonus).replace(/(\.|,)00$/g, '')}</h1>
                    
                    <h1 className="text-xl font-bold pt-5 m-2 text-center text-gray-600">TOTAL PRIMA SERVICIOS</h1>
                    <h1 className="text-2xl font-bold text-center">{numberFormat2.format(totalServicesBonus).replace(/(\.|,)00$/g, '')}</h1>
                    
                    <h1 className="text-xl font-bold pt-5 m-2 text-center text-gray-600">{date.getMonth() > 6 ? "BONIFICACION DE NAVIDAD" : false}</h1>
                    <h1 className="text-2xl font-bold text-center">{date.getMonth() > 6 ? numberFormat2.format(christmasBonus).replace(/(\.|,)00$/g, '') : false}</h1>
                    
                    <h1 className="text-xl font-bold pt-5 m-2 text-center text-gray-600">VALOR TOTAL POR CONCEPTO DE PRIMAS</h1>
                    <h1 className="text-2xl font-bold text-center">{numberFormat2.format(totalValueForBonusConcept).replace(/(\.|,)00$/g, '')}</h1>
                </div>
            </div>
        </div>
    )
}

export default App