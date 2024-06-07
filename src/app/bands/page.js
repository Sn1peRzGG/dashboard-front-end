'use client'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Bands() {
	const [bands, setBands] = useState([])

	useEffect(() => {
		async function fetchBands() {
			try {
				const response = await axios.get('http://localhost:8000/bands')
				setBands(response.data)
			} catch (error) {
				console.error('Error fetching bands:', error)
			}
		}
		fetchBands()
	}, [])

	function checkDirectionBlock(index) {
		return index % 2 === 0 ? 'even' : 'odd'
	}

	function getParticipantsWithoutSoloist(band) {
		return band.participants.filter(
			participant => participant !== band.soloist && participant.trim() !== ''
		)
	}

	function createTracksList(band) {
		return band.tracks.map((track, index) => {
			if (
				!track ||
				typeof track !== 'object' ||
				!track.name ||
				!track.duration
			) {
				return null
			}

			return (
				<li key={index}>
					{track.name} - {convertTime(track.duration)}
				</li>
			)
		})
	}

	function convertTime(duration) {
		return `${(duration - (duration % 60)) / 60} min ${duration % 60} sec`
	}

	return (
		<div className='container'>
			{bands.map((band, index) => (
				<div key={band._id} className={`band ${checkDirectionBlock(index)}`}>
					<div
						className='img-wrapper'
						style={{
							backgroundImage:
								band.icon && band.icon !== ''
									? `url('${band.icon}')`
									: 'url(https://placehold.co/340x340?text=No%20Image)',
						}}
					></div>

					<div className='title-wrapper'>
						<Link href={`/bands/${band._id}`}>
							<h2>
								{band.bandName != null && band.bandName !== ''
									? band.bandName
									: 'No Name'}
							</h2>
						</Link>
					</div>

					<div className='soloist-name-wrapper'>
						<h2>
							{band.soloist != null && band.soloist !== ''
								? band.soloist
								: 'No Soloist'}
						</h2>
					</div>

					<div className='participants-except-soloists-wrapper'>
						<p>
							{getParticipantsWithoutSoloist(band).length > 0
								? getParticipantsWithoutSoloist(band).join(', ')
								: 'No Other Participants'}
						</p>
					</div>

					<div className='tracks-list-wrapper'>
						<ul className='tracks-list'>{createTracksList(band)}</ul>
					</div>
				</div>
			))}
		</div>
	)
}

export default Bands
