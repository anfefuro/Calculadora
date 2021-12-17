import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

const App = () => {

    const {register, watch, handleSubmit} = useForm ();

    const [salaryBase, setSalaryBase] = useState(0);
    const [sumPayForExtraHours, setSumPayForExtraHours] = useState(0);
    const [payForBonusRecess, setPayForBonusRecess] = useState(0);

    const [lounchAllowance, setLounchAllowance] = useState(0);
    const [transAllowance, setTransAllowance] = useState(0);
    const [extraHoursForSem, setExtraHoursForSem] = useState(0);
    const [recessBonusPayForSem, setRecessBonusPayForSem] = useState(0);

    const [totalSemestralBonus, setTotalSemestralBonus] = useState(0);
    const [totalServicesBonus, setTotalServicesBonus] = useState(0);
    const [totalValueForBonusConcept, setTotalValueForBonusConcept] = useState(0);

    const [christmasBonus, setChristmasBonus] = useState(0);
    const [profitSharing, setProfitSharing] = useState(0);

    const [semestralChoice, setSemestralChoice] = useState (0);

    const salary = (event) => {
        setSalaryBase(event.target.value);
    }

    const extraHours = (event) => {
        setSumPayForExtraHours(event.target.value);
    }

    const payForBonus = (event) => {
        setPayForBonusRecess(event.target.value);
    }

    const christmas = 548696;

    //Second semestre: true - First semestre: false.
    useEffect(()=>{
        salaryBase > 0 ?
            setSemestralChoice(true) :
            setSemestralChoice(0)

        salaryBase > 0 ? 
            setLounchAllowance(129828) :
            setLounchAllowance(0)

        salaryBase <= 2725578 && salaryBase > 0 ? 
            setTransAllowance(106454) : 
            setTransAllowance(0)
    }, [salaryBase]) 
    //______________________________________________

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

    //_______________________________________________

    useEffect(() => {
        semestralChoice === true ?
            setChristmasBonus(parseInt((parseInt(christmas*1.35))+((parseInt(salaryBase)-(parseInt(christmas*2)))*0.3))) :
            setChristmasBonus(0)   
    }, [semestralChoice, christmas, salaryBase])

    useEffect(() => {
        christmasBonus === 0 ?
            setProfitSharing(298106) :
            setProfitSharing(0)
    }, [christmasBonus])
    //________________________________________________

    useEffect(() => {    
        salaryBase > 0 ?
            setTotalSemestralBonus(parseInt(lounchAllowance+transAllowance+extraHoursForSem+recessBonusPayForSem+(parseInt(christmasBonus)/6))+parseInt(salaryBase)+(parseInt(profitSharing))) :
            setTotalSemestralBonus(0)

        salaryBase > 0 ?
            setTotalValueForBonusConcept(parseInt(totalServicesBonus+christmasBonus)+parseInt(totalSemestralBonus)) :
            setTotalValueForBonusConcept(0)

    }, [semestralChoice, lounchAllowance, transAllowance, extraHoursForSem, recessBonusPayForSem, christmasBonus, salaryBase, profitSharing, christmas, totalServicesBonus, totalSemestralBonus])
    //___________________________________________________

    //Verification (React Hook Form)

    console.log(watch(["firstBox", "secondBox", "thirdBox"]))

    const firstBox = watch("firstBox");
    const secondBox = watch("secondBox");
    const thirdBox = watch("thirdBox");

    return (
        <div className="container mx-auto w-3/5 border mb-5 rounded">
            <h1 className="text-2xl p-5 text-center border text-gray-900 bg-gray-200 font-bold">CALCULO PRIMAS SEMESTRALES SEGUNDO SEMESTRE 2021</h1>
            <div className="flex flex-wrap">
                <form onSubmit={handleSubmit ((data) => console.log(data))} className="w-full sm:w-1/2 text-center p-5">
                    <label className="text-lg font-bold pt-5 m-2 text-center text-gray-600" htmlFor="firstBox">Sueldo básico a Noviembre 30 (*)</label>
                    <br></br>
                    <input {...register("firstBox")} onKeyUp={salary} className="border shadow m-2 w-full rounded leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="0" name="firstBox"/> 
                    <p className="text-red-500 text-xs italic">{firstBox == false ? "Ingrese un valor numerico" : ""}</p>
                    <br></br>

                    <h1 className="font-bold text-2xl pt-5 text-gray-600">VALORES PROPORCIONALES</h1>
                    <br></br>

                    <label className="text-lg font-bold pt-5 m-2 text-center text-gray-600" htmlFor="secondBox">Suma de lo pagado por horas extras en el semestre</label>
                    <br></br>
                    <input {...register("secondBox")} onKeyUp={extraHours} className="shadow border m-2 w-full rounded leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="0"/> 
                    <p className="text-red-500 text-xs italic">{secondBox == false ? "Ingrese un valor numerico" : ""}</p>
                    <br></br>
                    <br></br>

                    <label className="text-lg font-bold pt-5 m-2 text-center text-gray-600" htmlFor="thirdBox">Valor pagado por prima de vacaciones en el semestre
                    (JULIO 1 A DICIEMBRE 31)</label>
                    <br></br>
                    <input {...register("thirdBox")} onKeyUp={payForBonus} className="shadow border m-2 w-full rounded leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="0"/> 
                    <p className="text-red-500 text-xs italic">{thirdBox == false ? "Ingrese un valor numerico" : ""}</p>
                </form>
                <div className="w-full sm:w-1/2 pb-5 px-3">
                    <h1 className="text-lg font-bold pt-2 m-2 text-center text-gray-600">Subsidio de almuerzo con efecto prestacional</h1>
                    <h1 className="text-2xl font-bold text-center">${lounchAllowance}</h1>
                    
                    <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">Subsidio de transporte</h1>
                    <h1 className="text-2xl font-bold text-center">${transAllowance}</h1>
                    
                    <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">Horas extras en el semestre</h1>
                    <h1 className="text-2xl font-bold text-center">${extraHoursForSem}</h1>
                    
                    <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">Prima de vacaciones pagadas en el semestre</h1>
                    <h1 className="text-2xl font-bold text-center">${recessBonusPayForSem}</h1>
                    
                    <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">TOTAL PRIMA SEMESTRAL</h1>
                    <h1 className="text-2xl font-bold text-center">${totalSemestralBonus}</h1>
                    
                    <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">TOTAL PRIMA SERVICIOS</h1>
                    <h1 className="text-2xl font-bold text-center">${totalServicesBonus}</h1>
                    
                    <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">BONIFICACION DE NAVIDAD</h1>
                    <h1 className="text-2xl font-bold text-center">${christmasBonus}</h1>
                    
                    <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">VALOR TOTAL POR CONCEPTO DE PRIMAS</h1>
                    <h1 className="text-2xl font-bold text-center">${totalValueForBonusConcept}</h1>
                </div>
            </div>
        </div>
    )
}

export default App