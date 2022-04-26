import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class MatPaginatorIntlFrensh extends MatPaginatorIntl {
    itemsPerPageLabel = 'Elements par page: ';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' sur ' + length;
    }
}