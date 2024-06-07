'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BandDetails() {
	const params = useParams()
	const id = params.id
	const [band, setBand] = useState(null)

	useEffect(() => {
		async function fetchBand() {
			try {
				const response = await axios.get(`http://localhost:8000/bands/${id}`)
				setBand(response.data)
			} catch (error) {
				console.error('Error fetching band:', error)
			}
		}
		if (id) {
			fetchBand()
		}
	}, [id])

	function getParticipantsWithoutSoloist(band) {
		return band.participants.filter(
			participant => participant !== band.soloist && participant.trim() !== ''
		)
	}

	function convertTime(duration) {
		return `${(duration - (duration % 60)) / 60} min ${duration % 60} sec`
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

	return (
		<div className='w-4/5 mt-24'>
			{band && (
				<div key={band._id} className='band even'>
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
						<h2>
							{band.bandName != null && band.bandName !== ''
								? band.bandName
								: 'No Name'}
						</h2>
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
			)}
		</div>
	)
}
