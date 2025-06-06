import styles from './suggestions.module.css'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularuserCard'

const popularUser = [11, 1, 1, 1, 1]

const Suggestions = () => {
    return (
        <div className={styles.container}>
            <SearchUser />

            <article className={styles.topBar}>
                <p>Suggestions for You...</p>
                <p>View All</p>
            </article>

            <article className={styles.cardsWrapper}>
                {popularUser.map((item, index) => (
                    <PopularUserCard key={index} />
                ))}
            </article>
        </div>
    )
}

export default Suggestions
