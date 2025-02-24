import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface IBreadcrumb {
    label: string;
    link?: Url;
}

function Breadcrumb({ breadcrumbs } : 
    { 
        breadcrumbs: Array<IBreadcrumb> 
    }) {

    const [lastBreadcrumb, setLastBreadcrumb] = useState<IBreadcrumb | null>(null);
    const [data, setData] = useState<Array<IBreadcrumb>>([]);

    useEffect(() => {
        const breadLast = [ ...breadcrumbs ].pop();
        if(breadLast){
            setLastBreadcrumb(breadLast);
        }

        if(breadcrumbs && Array.isArray(breadcrumbs)) {
            setData(breadcrumbs);
        }
    }, [breadcrumbs])

    return (
        <>
            {(data?.length > 0) &&
                <div className="pagetitle">
                    {lastBreadcrumb?.label && <h1>{lastBreadcrumb?.label}</h1>}
                    <nav>
                        <ol className="breadcrumb">
                            {data.map((item, idx) => (
                                <li key={idx} className={`breadcrumb-item ${lastBreadcrumb?.label === item?.label && 'active'}`}>
                                    {item?.link ? 
                                        <Link href={item?.link}>{item?.label}</Link>
                                    :
                                        item?.label}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>
            }
        </>
    )
}

export default Breadcrumb