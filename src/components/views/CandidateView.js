import React from 'react'

var CandidateView;
export default CandidateView = (props)=>{
    var cv = props.cv;
    return(
    <tr key={props.key}>
        <td>{(cv.name       || '-')}</td>
        <td>{(cv.email      || '-')}</td>
        <td>{(cv.mobile     || '-')}</td>
        <td>{(cv.skill      || '-')}</td>
        <td>{(cv.interest   || '-')}</td>
    </tr>
)};