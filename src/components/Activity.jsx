import "./components.css";

function Activity({ activity }) {
    const formattedDate = new Date(activity.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", });
    const username = activity.user?.username || "Unknown";
    const title = activity.title?.title || "Unknown title";
    const type = activity.activityType;

    let message;

    switch (type) {
        case "favorite":
            message = (
                <>
                    <span className="activity-username">{username}</span> added{" "}
                    <span className="activity-title">"{title}"</span> to favorites
                </>
            );
            break;

        case "watchlater":
            message = (
                <>
                    <span className="activity-username">{username}</span> added{" "}
                    <span className="activity-title">"{title}"</span> to Watch Later
                </>
            );
            break;

        case "removeFavorited":
            message = (
                <>
                    <span className="activity-username">{username}</span> removed{" "}
                    <span className="activity-title">"{title}"</span> from favorites
                </>
            );
            break;

        case "removeWatchLater":
            message = (
                <>
                    <span className="activity-username">{username}</span> removed{" "}
                    <span className="activity-title">"{title}"</span> from Watch Later
                </>
            );
            break;

        default:
            message = (
                <>
                    <span className="activity-username">{username}</span> did an activity
                </>
            );
            break;
    }

    return (
        <li className="activity-item">
            <p>{message} - <span className="activity-date">{formattedDate}</span></p>
        </li>
    );
}

export default Activity;