import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';


@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  @ApiOkResponse({type: [PostDto]})
  async findAll() {
    // get all posts in the db
    return await this.postService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PostDto })
  @ApiParam({ name: 'id', required: true })
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    // find the post with this id
    const post = await this.postService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException('This Post doesn\'t exist');
    }

    // if post exist, return the post
    return post;
  }

  /**
   * JWT is used to protect the route.
   * Only logged in users can create a post.
   */
  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
    // create a new post and return the newly created post
    return await this.postService.create(post, req.user.id);
  }

  @Put(':id')
  @ApiOkResponse({ type: PostEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req,
  ): Promise<PostEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      post,
      req.user.id,
    );

    // if the number of row affected is zero, it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This Post doesn\'t exist');
    }

    // return the updated post
    return updatedPost;
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.postService.delete(id, req.user.id);

    // if the number of row affected is zero, then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException('This Post doesn\'t exist');
    }

    // return success message
    return 'Successfully deleted';
  }
}
