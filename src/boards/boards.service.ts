import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board: Board = {
            // title: title, can omit : title because values are the same
            id: uuid(), // db makes the id automatically upon creation
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        //put this object in the array created above
        this.boards.push(board);
        return board;
    }
}
