import React from 'react';
import './MyTeamEmptyState.css'

function MyTeamEmptyState(props) {
    return(
        <div className='MyTeam__empty-state'>
            <div className="MyTeam__empty-state--image"></div>
            <div className="MyTeam__empty-state--text">Nincsenek közvetlen beosztottaid a Plenuumban.</div>
        </div>
    )
}

export default MyTeamEmptyState