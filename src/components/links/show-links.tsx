'use client'

interface LinksProps {
    id: string;
    original_url: string;
    short_url: string;
    created_at: Date;
    user_id: string;
}

interface ShowLinksProps {
    links: LinksProps[];
}



const ShowLinks: React.FC<ShowLinksProps> = ({ links }) => {
    return (
        <div>
            {links
                /* .sort((a, b) => b.id - a.id) */
                .map(link => {
                    return (
                        <div key={link.id}>
                            <div>{link.original_url}</div>
                            <div>{link.short_url}</div>
                            <div>{link.user_id}</div>
                        </div>
                    );
                })}
        </div>
    );
}

export default ShowLinks;


