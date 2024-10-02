import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

type Player = {
	name: string
	target: string
}

const startKillers = [
	'Саша Мамниашвили',
	'Даня Пшеничников',
	'Никита Грибанов',
	'Никита Грошев',
	'Даня Покрасов',
	'Саша Коляда',
	'Даня Орлов',
	'Ярослав Терешко',
	'Дима Захаров',
	'Миша Недвига',
	'Егор Мизюлин',
	'Боря Московский',
	'Ваня Разин'
]

const startPlayers: Player[] = []

for (const player of startKillers) {
	startPlayers.push({
		name: player,
		target: ''
	})
}

const App = () => {
	const [players, setPlayers] = useState(startPlayers)
	const [isEdit, setIsEdit] = useState(true)
	let playersList = [...players]

	const handleDelete = (name: string) => {
		setPlayers((prev) => prev.filter((player) => player.name !== name))
	}

	const setTargetForPlayer = (startPlayer: Player) => {
		let player = startPlayer
		while (playersList.length > 1) {
			const randomPlayer = getRandomPlayer()
			if (randomPlayer.target || randomPlayer.name === player.name) {
				continue
			}
			player.target = randomPlayer.name
			playersList = playersList.filter(
				(item) => item.name !== randomPlayer.name
			)
			player = randomPlayer
		}
		player.target = playersList[0].name
		setIsEdit(false)
	}

	const handleStart = () => {
		setTargetForPlayer(playersList[0])
	}

	function getRandomPlayer(): Player {
		return playersList[Math.floor(Math.random() * playersList.length)]
	}

	const handleReStart = () => {
		const newPlayers: Player[] = players.map((player) => {
			return { name: player.name, target: '' }
		})
		setIsEdit(true)
		setPlayers(newPlayers)
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-900 p-4'>
			<div className='bg-gray-800 shadow-lg rounded-lg p-4 w-full max-w-xs'>
				<h2 className='text-2xl font-bold mb-4 text-center text-red-500'>
					Список Убийц
				</h2>
				<div className='space-y-2'>
					{players.map((player) => (
						<div
							key={player.name}
							className='flex justify-between items-center p-2 bg-gray-700 rounded-lg'
						>
							<div className='text-white truncate w-1/2'>
								{player.name}
							</div>
							<div className='text-green-400 font-semibold truncate w-1/2'>
								{!isEdit ? player.target : ''}
							</div>
							{isEdit && (
								<button
									onClick={() => handleDelete(player.name)}
									className='text-red-400 hover:text-red-600'
								>
									<AiOutlineClose />
								</button>
							)}
						</div>
					))}
				</div>
				<button
					onClick={!isEdit ? handleReStart : handleStart}
					className='mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200'
				>
					{!isEdit ? 'Редактировать' : 'Начать'}
				</button>
			</div>
		</div>
	)
}

export default App
