import React, { useState, useEffect } from 'react';

const Autocount = () => {
    let [metricTon, setMetricTon] = useState(1)
    useEffect(() => {
        const interval = setInterval(() => {
            setMetricTon(metricTon++)
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    return (
        <div style={{ backgroundColor: 'white',padding:'1%', position:'fixed',bottom:'0', marginBottom:'2%' }}>
            <div>44 million Metric Tons of Carbon Dioxide are released by Amazon a YEAR</div>
            <div>Thats 83.7 Metric Tons a minute or 1.39 a second</div>
            <br />
            <div>{metricTon} second{(metricTon > 1 ? 's are' : ' is')} equal to {new Intl.NumberFormat().format(metricTon * 127532)} smartphones charged</div>
            <div>{metricTon} second{(metricTon > 1 ? 's are' : ' is')} equal to Greenhouse gas emissions by {new Intl.NumberFormat().format(metricTon * 2481)} Miles driven by an average passenger vehicle</div>
        </div>
    )
}
export default Autocount