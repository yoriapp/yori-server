import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserLibraryService } from './user-library.service';
import { UserLibrary } from './user-library.schema';
import { AddToLibraryInput, UpdateStatusInput } from './dto/user-library.dto';

@Resolver()
export class UserLibraryResolver {
  constructor(private readonly userLibraryService: UserLibraryService) {}

  @Mutation(() => UserLibrary)
  async addToLibrary(
    @Args('input') input: AddToLibraryInput,
  ): Promise<UserLibrary> {
    const { userId, mangaId, status } = input;
    return this.userLibraryService.addToLibrary(userId, mangaId, status);
  }

  @Mutation(() => UserLibrary)
  async updateStatus(
    @Args('input') input: UpdateStatusInput,
  ): Promise<UserLibrary> {
    const { userId, mangaId, status } = input;
    return this.userLibraryService.updateStatus(userId, mangaId, status);
  }

  @Mutation(() => Boolean)
  async removeFromLibrary(
    @Args('userId') userId: string,
    @Args('mangaId') mangaId: string,
  ): Promise<boolean> {
    await this.userLibraryService.removeFromLibrary(userId, mangaId);
    return true;
  }

  @Query(() => [UserLibrary])
  async getLibrary(@Args('userId') userId: string): Promise<UserLibrary[]> {
    return this.userLibraryService.getLibrary(userId);
  }
}
