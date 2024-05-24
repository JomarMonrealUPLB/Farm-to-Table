import React, { useEffect, useState } from 'react'
import {orders} from "../assets/dummy_data/orders"
import DataTable from '../components/DataTable'
import Header from '../components/Header'
import { sortBy } from '../utils/sortBy'
import { products } from '../assets/dummy_data/products'
import { translateProductType } from '../utils/translateProductType'
import moment from 'moment';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const SalesReport = () => {
    const [orderList, setOrderList] = useState(orders)
    const [originalSerializedOrderList, setOriginalSerializedOrderList] = useState([])
    const [serializedOrderList, setSerializedOrderList] = useState([])
    const [totalSales, setTotalSales] = useState(0)
    
    const timeframes = ["Weekly Report", "Monthly Report", "Yearly Report"]
    const [timeframeIndex, setTimeframeIndex] = useState(2)
    const [referenceDate, setReferenceDate] = useState(null)
    const [startDate, setStartDate] = useState(moment().day(1))
    const [endDate, setEndDate] = useState(moment().day(1))


    const heads = [
        {label: "Date"}, 
        {label: "Product"}, 
        {label: "Type"}, 
        {label: "Price/kg"}, 
        {label: "Sold"}, 
        {label: "Sales"}
    ]

    useEffect(() => {
        let isMounted = false

        const fetchData = ()=>{
            let serializedData = []
            setTotalSales(0)
            orderList.forEach(order => {
                if(order.status !== 2) return
    
                const product = products.find(product => product.id === order.productID)
                const soldOrders = orderList.filter(jOrder => jOrder.status === 2 && jOrder.productID === product.id)
                let soldCount = 0
                soldOrders.forEach(soldOrder => {
                    soldCount += soldOrder.quantity
                });
    
                serializedData.push(
                    {
                        id: order.id,
                        date: new Date(order.date).toLocaleString(),
                        product: product.name,
                        type: translateProductType(product.type),
                        price: product.price,
                        sold: soldCount,
                        sales: product.price * soldCount,
                    }
                )
                setTotalSales(totalSales => totalSales += product.price * soldCount) 
                
            })
            serializedData = sortBy(serializedData,"date",false)
            setOriginalSerializedOrderList(serializedData)
            setSerializedOrderList(serializedData) 
        }

        fetchData()
        return ()=>{
            isMounted =true
        }
        
    }, []);
    
    useEffect(() => {
        if(serializedOrderList.length !== 0){
            const currentDate = moment(serializedOrderList[0].date)
            let tempStartDate = moment(currentDate).day(0)
            let tempAddedDate = tempStartDate.clone().add(7,"d")
            let timeframeLength = 0
            let timeframe = "d"
            if(timeframeIndex === 0){ timeframeLength = 7; timeframe = "d"}
            else if(timeframeIndex === 1) { timeframeLength = 1; timeframe = "M"}
            else if(timeframeIndex === 2) { timeframeLength = 1; timeframe = "y"}
            
            while(currentDate.isBetween(tempStartDate, tempAddedDate) === false){
                tempStartDate = tempStartDate.clone().add(timeframeLength,timeframe)
                tempAddedDate = tempAddedDate.clone().add(timeframeLength,timeframe)
            }
            let referenceDateTemp = tempStartDate
            setReferenceDate(referenceDateTemp)
            tempStartDate = moment(referenceDateTemp).startOf('year')
            tempAddedDate = moment(referenceDateTemp).endOf('year')
            setStartDate(tempStartDate)
            setEndDate (tempAddedDate)
            const tempOrders = originalSerializedOrderList.filter(order=>moment(order.date).isBetween(tempStartDate.clone().subtract(1,"d"),tempAddedDate.clone().add(1,"d")))
            setSerializedOrderList(tempOrders)           
            let sum = 0
            tempOrders.forEach(order=>{
                sum += order.sales
            })
            setTotalSales(sum) 
        }
    }, [originalSerializedOrderList]);
    

    return (
    <div className='account_management page'>
        <Header headerTitle={"Sales Report"}/>

        <div style={{display:"flex",justifyContent:"center"}}>      
            {
                serializedOrderList.length === 0? <h1 style={{textAlign:"center",padding:"120px"}}>No Graph to Show.</h1>:
                <LineChart width={600} height={300} data={[...serializedOrderList].reverse()}>
                    <Line type="monotone" dataKey="sales" stroke="var(--primary-green)" />
                    <CartesianGrid stroke="#var(--primary-green-dark)" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            }
        </div>


        <div className='product_detail_screen-carousel' style={{paddingTop:"1ch"}}>
            <MdKeyboardArrowLeft 
                size={"40px"} 
                color='var(--primary-green)' 
                cursor={"pointer"} 
                onClick={()=>{
                    let tempStart = null
                    let tempEnd = null
                    if(timeframeIndex === 0){ 
                        tempStart =(moment(referenceDate).startOf('year'))
                        tempEnd = (moment(referenceDate).endOf('year'))
                    }
                    else if(timeframeIndex === 1) { 
                        tempStart =(moment(referenceDate))
                        tempEnd = (moment(referenceDate).add(7,"d"))
                    }
                    else if(timeframeIndex === 2) { 
                        tempStart =(moment(referenceDate).startOf('month'))
                        tempEnd = (moment(referenceDate).endOf('month'))
                    }
                    setTimeframeIndex(timeframeIndex !== 0?(timeframeIndex-1):timeframes.length-1) 
                    setStartDate(tempStart)
                    setEndDate(tempEnd)

                    const tempOrders = originalSerializedOrderList.filter(order=>moment(order.date).isBetween(tempStart,tempEnd))
                    setSerializedOrderList(tempOrders)           
                    let sum = 0
                    tempOrders.forEach(order=>{
                        sum += order.sales
                    })
                    setTotalSales(sum)   
                }}
            />
            <h1 style={{textAlign:"center", userSelect:"none"}}>{timeframes[timeframeIndex]}</h1>
            <MdKeyboardArrowRight
                size={"40px"} 
                color='var(--primary-green)' 
                cursor={"pointer"} 
                onClick={()=>{
                    let tempStart = null
                    let tempEnd = null
                    if(timeframeIndex === 0){ 
                        tempStart =(moment(referenceDate).startOf('month'))
                        tempEnd =(moment(referenceDate).endOf('month'))
                    }
                    else if(timeframeIndex === 1) { 
                        tempStart =(moment(referenceDate).startOf('year'))
                        tempEnd =(moment(referenceDate).endOf('year'))
                    }
                    else if(timeframeIndex === 2) { 
                        tempStart =(moment(referenceDate))
                        tempEnd =(moment(referenceDate).add(7,"d"))
                    }
                    setTimeframeIndex((timeframeIndex+1)%timeframes.length) 
                    setStartDate(tempStart)
                    setEndDate(tempEnd)
                    const tempOrders = originalSerializedOrderList.filter(order=>moment(order.date).isBetween(tempStart,tempEnd))
                    setSerializedOrderList(tempOrders)           
                    let sum = 0
                    tempOrders.forEach(order=>{
                        sum += order.sales
                    })
                    setTotalSales(sum)   
                }}
            />
        </div>
        <div className='product_detail_screen-carousel'>
            <MdKeyboardArrowLeft 
                size={"40px"} 
                color='var(--primary-green)' 
                cursor={"pointer"} 
                onClick={()=>{
                    let timeframeLength = 0
                    let timeframe = "d"
                    if(timeframeIndex === 0){ timeframeLength = 7; timeframe = "d"}
                    else if(timeframeIndex === 1) { timeframeLength = 1; timeframe = "M"}
                    else if(timeframeIndex === 2) { timeframeLength = 1; timeframe = "y"}

                    let tempStart = startDate.clone().subtract(timeframeLength,timeframe)
                    let tempEnd = endDate.clone().subtract(timeframeLength,timeframe)
                    setStartDate(tempStart)
                    setEndDate(tempEnd)
                    const tempOrders = originalSerializedOrderList.filter(order=>moment(order.date).isBetween(tempStart, timeframeIndex === 0? tempEnd.clone().add(1,"d"):tempEnd))
                    setSerializedOrderList(tempOrders)           
                    let sum = 0
                    tempOrders.forEach(order=>{
                        sum += order.sales
                    })
                    setTotalSales(sum)   
                }}
            />
            <h1 style={{textAlign:"center", userSelect:"none"}}>{`${startDate.format("LL")} - ${endDate.format("LL")}`}</h1> 
            <MdKeyboardArrowRight
                size={"40px"} 
                color='var(--primary-green)' 
                cursor={"pointer"} 
                onClick={()=>{
                    let timeframeLength = 0
                    let timeframe = "d"
                    if(timeframeIndex === 0){ timeframeLength = 7; timeframe = "d"}
                    else if(timeframeIndex === 1) { timeframeLength = 1; timeframe = "M"}
                    else if(timeframeIndex === 2) { timeframeLength = 1; timeframe = "y"}

                    let tempStart = startDate.clone().add(timeframeLength,timeframe)
                    let tempEnd = endDate.clone().add(timeframeLength,timeframe)
                    setStartDate(tempStart)
                    setEndDate(tempEnd)
                    const tempOrders = originalSerializedOrderList.filter(order=>moment(order.date).isBetween(tempStart,timeframeIndex === 0? tempEnd.clone().add(1,"d"):tempEnd))
                    setSerializedOrderList(tempOrders)           
                    let sum = 0
                    tempOrders.forEach(order=>{
                        sum += order.sales
                    })
                    setTotalSales(sum)   

                }}
            />
        </div>

        <DataTable data={serializedOrderList} heads={heads}/>
        <hr/>
            <div className='sales_total_container' style={{display: "flex", justifyContent:"end", alignItems:"center", fontSize: "20px",backgroundColor:"var(--primary-background)"}}>
                <span>Total Sales: </span>
                <strong>P {totalSales}</strong>
            </div>
        <hr/>

    </div>
    )

   
}

export default SalesReport