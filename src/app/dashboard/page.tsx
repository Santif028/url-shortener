import ShowLinks from '@/components/links/show-links';
import { getLinksByUser } from '@/server/actions/links';
import { getUserBySession } from '@/server/utils/users';


const DashboardPage = async () => {
    const user = await getUserBySession();

    if (user) {
        const getLinks = await getLinksByUser(user);

        if (!getLinks) {
            return <div>Error</div>;
        }
        return (

            <ShowLinks links={getLinks} />
        )
    }

}

export default DashboardPage