import { Injectable } from '@nestjs/common';

export interface Issue {
  title: string;
  description: string;
  id: number;
}

@Injectable()
export class AppService {
  issues: Issue[] = [
    {
      id: 1,
      title: 'Galactic Wars',
      description: 'Enter the den of dragons and uncover its mysteries.',
    },
    {
      id: 2,
      title: 'The Great Escape',
      description: 'Enter the den of dragons and uncover its mysteries.',
    },
    {
      id: 3,
      title: 'Eternal Journey',
      description: 'A mission so secret, it could change the world.',
    },
    {
      id: 4,
      title: 'Hidden Treasures',
      description: 'A war that spans across the galaxy.',
    },
    {
      id: 5,
      title: 'Galactic Wars',
      description: 'Uncover hidden treasures buried deep within.',
    },
    {
      id: 6,
      title: 'Eternal Journey',
      description: 'An eternal journey across uncharted territories.',
    },
    {
      id: 7,
      title: 'Mystery Island',
      description: 'A forbidden love story that defies all odds.',
    },
    {
      id: 7,
      title: 'Eternal Journey',
      description: 'Uncover hidden treasures buried deep within.',
    },
    {
      id: 9,
      title: 'Secret Mission',
      description: 'An eternal journey across uncharted territories.',
    },
    {
      id: 10,
      title: 'Eternal Journey',
      description: 'Travel through time to discover lost civilizations.',
    },
  ];

  getIssue(id: number): Issue {
    const issue = this.issues.find((i) => i.id === id);
    console.log(`Issue with id ${id} is ${JSON.stringify(issue)}`);
    return issue;
  }

  createIssue(issue: Issue) {
    const lastId = this.issues[this.issues.length - 1].id;
    issue.id = lastId + 1;
    console.log(`Creating issue: ${JSON.stringify(issue)}`);
    this.issues.push(issue);
    return issue;
  }

  updateIssue(id: number, issue: Issue) {
    let updatedIssue = {} as Issue;
    this.issues = this.issues.map((i) => {
      if (i.id === id) {
        i.description = issue.description ? issue.description : i.description;
        i.title = issue.title ? issue.title : i.title;
        updatedIssue = i;
      }
      return i;
    });
    console.log(`Issue with id ${id} updated: ${JSON.stringify(updatedIssue)}`);
    return updatedIssue;
  }

  deleteIssue(id: number) {
    let deletedId = 0;
    this.issues = this.issues.filter((i) => {
      if (i.id === id) {
        deletedId = id;
      } else {
        return;
      }
    });
    if (deletedId > 0) {
      console.log(`Issue with id ${id} is deleted`);
    } else {
      console.log(`Issue with id ${id} not found`);
    }
    return deletedId;
  }
}
