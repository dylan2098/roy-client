import {
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap";

import { useEffect, useContext, useState } from 'react';

export default function Paging({ clickIndexPage, propPaging }) {
    const [paging, setPaging] = useState();

    const classNameCurrentPage = (currenIndex, offsetPage) => {
        return (currenIndex === offsetPage) ? "active" : null;
    }

    useEffect(() => {
        if (propPaging) {
            setPaging(propPaging);
        }
    }, [propPaging])


    return (
        <CardFooter className="py-4">
            <nav aria-label="...">

                <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                >
                    {
                        paging && <PaginationItem onClick={(e) => clickIndexPage(1)}>
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                tabIndex="-1"
                            >
                                <i className="fas fa-angle-left" />
                                <i className="fas fa-angle-left" />
                                <span className="sr-only">First</span>
                            </PaginationLink>
                        </PaginationItem>
                    }

                    {
                        paging && <PaginationItem onClick={(e) => clickIndexPage((paging.offset - 1 > 0) ? (paging.offset - 1) : paging.numberPages)}>
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                tabIndex="-1"
                            >
                                <i className="fas fa-angle-left" />
                                <span className="sr-only">Previous</span>
                            </PaginationLink>
                        </PaginationItem>
                    }
                    {/* {

                        paging && Array.from(Array(paging.numberPages), (e, i) => {
                            return (
                                <PaginationItem key={i + 1} className={classNameCurrentPage(i + 1, paging.offset)} onClick={(e) => clickIndexPage(i + 1)}>
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })
                    } */}

                    {
                        paging && <PaginationItem className="active">
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                {paging.offset}
                            </PaginationLink>
                        </PaginationItem>
                    }


                    {
                        paging && (
                            <PaginationItem onClick={(e) => clickIndexPage((paging.offset + 1 <= paging.numberPages) ? paging.offset + 1 : 1)}>
                                <PaginationLink
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <i className="fas fa-angle-right" />
                                    <span className="sr-only">Next</span>
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    {
                        paging && (
                            <PaginationItem onClick={(e) => clickIndexPage(paging.numberPages)}>
                                <PaginationLink
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <i className="fas fa-angle-right" />
                                    <i className="fas fa-angle-right" />
                                    <span className="sr-only">Last</span>
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                </Pagination>
            </nav>
        </CardFooter >
    )
}